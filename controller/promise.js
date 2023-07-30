const {default :axios} =require('axios');

function newspromise(url){
    return new Promise((resolve, reject)=>{
        axios.request(url).then(resp=>{
            return resolve(resp.data);
    }).catch(err=>{
        return reject(err);
    });  
});
}

module.exports={newspromise};