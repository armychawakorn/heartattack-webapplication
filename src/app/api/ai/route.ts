import { NextRequest, NextResponse } from "next/server";
import { PythonShell, PythonShellError } from "python-shell";

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        const result = await predict(body);
        return NextResponse.json({ prediction: result });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ prediction: error });
    }
}

async function predict(data: number[]) {
    return new Promise((resolve, reject) => {
        try {
            const pyshell = new PythonShell('src/app/api/ai/predict.py', {
                pythonPath: 'src/app/api/ai/.venv/Scripts/python.exe'
            });

            pyshell.send(JSON.stringify([
                data[0],
                data[1],
                data[2],
                data[3],
                data[4],
                data[5],
                data[6],
                data[7]
            ]));

            pyshell.on('message', function (message: number) {
                resolve(message);
            });

            pyshell.end(function (err: PythonShellError, code: number, signal: string) {
                if (err) throw err;
                console.log('The exit code was: ' + code);
                console.log('The exit signal was: ' + signal);
                console.log('finished');
            });
        }catch(err){
            console.error(err);
            reject(-1);
        }
    });
}