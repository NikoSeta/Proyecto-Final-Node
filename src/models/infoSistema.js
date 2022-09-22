let infoNode = [
    process.argv,
    process.cwd(), 
    process.pid, 
    process.version, 
    process.title, 
    process.platform, 
    process.memoryUsage()
];

module.exports = {infoNode}