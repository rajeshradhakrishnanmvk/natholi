import { createServer } from 'http';
import { readFile, readdir, stat, writeFile } from 'fs/promises';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { parse as parseUrl } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const PORT = 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
};

const server = createServer(async (req, res) => {
    try {
        // Parse the URL to check for API endpoints
        const parsedUrl = parseUrl(req.url, true);
        const pathname = parsedUrl.pathname;

        // Handle API endpoint for reading folders
        if (pathname === '/api/read-folder') {
            const folderPath = parsedUrl.query.path || '.';
            const fileExt = parsedUrl.query.ext || '';

            try {
                // Security: Only allow reading from certain directories
                const allowedPaths = ['.', 'wiki', 'public', 'teamgenz'];
                const normalizedPath = folderPath.replace(/^\.\//, '');
                const isAllowed = allowedPaths.some(allowed =>
                    normalizedPath === allowed || normalizedPath.startsWith(allowed + '/')
                );

                if (!isAllowed) {
                    res.writeHead(403, {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    });
                    res.end(JSON.stringify({ error: 'Access denied to this folder' }));
                    return;
                }

                const fullPath = join(process.cwd(), folderPath);
                const files = await readdir(fullPath);

                // Filter and read files
                const fileContents = [];

                for (const file of files) {
                    const filePath = join(fullPath, file);
                    const fileStat = await stat(filePath);

                    // Skip directories
                    if (fileStat.isDirectory()) continue;

                    // Filter by extension if provided
                    if (fileExt && !file.endsWith(fileExt)) continue;

                    // Read file content
                    try {
                        const content = await readFile(filePath, 'utf-8');
                        fileContents.push({
                            name: file,
                            path: join(folderPath, file),
                            size: fileStat.size,
                            content: content
                        });
                    } catch (readError) {
                        // Skip files that can't be read as text
                        console.warn(`Could not read file ${file}: ${readError.message}`);
                    }
                }

                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ files: fileContents }));
                return;

            } catch (error) {
                res.writeHead(500, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ error: error.message }));
                return;
            }
        }

        // Handle API endpoint for editing web files
        if (pathname === '/api/edit-web-file' && req.method === 'POST') {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                try {
                    const { filePath, newContent } = JSON.parse(body);

                    if (!filePath || newContent === undefined) {
                        res.writeHead(400, {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        });
                        res.end(JSON.stringify({ error: 'Missing filePath or newContent' }));
                        return;
                    }

                    // Security: Only allow editing HTML, CSS, and JS files in certain directories
                    const allowedPaths = ['public', 'teamgenz'];
                    const allowedExtensions = ['.html', '.css', '.js'];

                    const normalizedPath = filePath.replace(/^\.\//, '');
                    const fileExtension = extname(filePath);

                    // Check if file is in allowed directory
                    const isAllowedPath = allowedPaths.some(allowed =>
                        normalizedPath.startsWith(allowed + '/')
                    );

                    // Check if file has allowed extension
                    const isAllowedExtension = allowedExtensions.includes(fileExtension);

                    if (!isAllowedPath) {
                        res.writeHead(403, {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        });
                        res.end(JSON.stringify({
                            error: `Access denied. Can only edit files in: ${allowedPaths.join(', ')}`
                        }));
                        return;
                    }

                    if (!isAllowedExtension) {
                        res.writeHead(403, {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        });
                        res.end(JSON.stringify({
                            error: `Access denied. Can only edit files with extensions: ${allowedExtensions.join(', ')}`
                        }));
                        return;
                    }

                    const fullPath = join(process.cwd(), filePath);

                    // Read original content for backup/comparison
                    let originalContent = '';
                    try {
                        originalContent = await readFile(fullPath, 'utf-8');
                    } catch (readError) {
                        // File might not exist yet, that's okay
                        console.log(`File ${filePath} does not exist yet, will create new file`);
                    }

                    // Write the new content
                    await writeFile(fullPath, newContent, 'utf-8');

                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    });
                    res.end(JSON.stringify({
                        success: true,
                        message: `File ${filePath} updated successfully`,
                        originalSize: originalContent.length,
                        newSize: newContent.length
                    }));

                } catch (error) {
                    res.writeHead(500, {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    });
                    res.end(JSON.stringify({ error: error.message }));
                }
            });

            return;
        }

        // Default file serving
        let filePath = pathname === '/' ? '/index.html' : pathname;
        filePath = join(process.cwd(), filePath);

        const data = await readFile(filePath);
        const ext = extname(filePath);
        const mimeType = mimeTypes[ext] || 'text/plain';

        res.writeHead(200, {
            'Content-Type': mimeType,
            'Access-Control-Allow-Origin': '*'
        });
        res.end(data);
    } catch (error) {
        res.writeHead(404);
        res.end('File not found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Open http://localhost:3000 in your browser');
});
