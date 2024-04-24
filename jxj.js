const child_process=require("node:child_process");
const fs=require("node:fs");
//console.log(process.argv);//linkSync(existing,new)
console.log(`ldd ${process.argv[2]}`)
let ex=child_process.execSync(`ldd ${process.argv[2]}`).toString();
let xe=[];
function dtree(d,r){
    d=d.split('/');
    let cd=r?r:'/';
    d.forEach((d)=>{
        if(!fs.existsSync(cd)){
            fs.mkdirSync(cd);
            console.log(`Creating dir: ${cd}`);
        }
        cd+=`${d}/`;
    });
}
dtree(process.argv[2],process.argv[3]);
fs.copyFileSync(process.argv[2],`${process.argv[3]}${process.argv[2]}`);
console.log(`${process.argv[2]} => ${process.argv[3]}${process.argv[2]}`);
ex.split('\n').forEach((d)=>{
    d=d.split('=>');
    if(d[1]){
        let f=d[1].split(' ')[1];
        dtree(f,process.argv[3]);
        fs.copyFileSync(f,`${process.argv[3]}${f}`);
        console.log(`${f} => ${process.argv[3]}${f}`);
    }
});
