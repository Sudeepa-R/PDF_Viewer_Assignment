const superuserClient=require('./Database');

(async ()=>{
    await superuserClient.connect();
    const result=await superuserClient.query(`insert into users`)
})