const fileSystem = require('fs');
const fileName = 'tasks.json';

const requestHandler = (reqest,responce) =>{
    const url = reqest.url;
    const method = reqest.method;

    if (url === '/'){
        responce.setHeader('Content-Type', 'text/html');
        responce.write("<html>");
        responce.write("<head><title>Hello Friend!</title></head>");
        responce.write("<body>");
        responce.write("<form action ='/tasks' method ='POST'><button type='submit'>Get Tasks</button> </form>");
        responce.write("<p>To add task please fill following form: </p></br>");
        responce.write("<form action ='/taskCreate' method ='POST'><input type='text' name='message'><button type='submit'>Create Task</button> </form>");
        responce.write("</body>");
        responce.write("</html>");
        return responce.end();
    }

    if (url ==='/tasks'){
        fileSystem.readFile(fileName,(err, data)=>{
            if (err){
                responce.setHeader('Content-Type', 'text/html');
                responce.write("<html>");
                responce.write("<head><title>No Tasks found</title></head>");
                responce.write("<body>");
                responce.write("<p>No Tasks found<p>");
                responce.write("<form action ='/' method ='POST'><button type='submit'>Back to homepage</button> </form>");
                responce.write("</body>");
                responce.write("</html>");
                return responce.end();
            }
            else{
                let tasks = JSON.parse(data);
                responce.setHeader('Content-Type', 'text/html');
                responce.write("<html>");
                responce.write("<head><title>Task List:</title></head>");
                for (let task of tasks){
                    responce.write(`<p>${task}</p></br>`)
                }
                responce.write("</html>");
                return responce.end();
            }
        })
    }

    if (url === '/taskCreate' && method ==='POST'){
        const body = [];
        reqest.on('data',(chunk)=>{
            body.push(chunk);
        });

        reqest.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const taskName = parsedBody.split('=')[1];
            const jsonTaskname = JSON.stringify(taskName);
            fileSystem.writeFile(fileName,jsonTaskname,(err) =>{
                if (err){
                    throw err;
                }
                else{
                    console.log(`Task ${jsonTaskname} is added to file ${fileName}`)
                }
            });
        });
        responce.statusCode = 302;
        responce.setHeader('Location','/');
        responce.end();
    }

};


module.exports = requestHandler;