export default  (conversation,user_id)=>{
    console.log('formatting',conversation,user_id)
    //Formate le nom d'une conversation
    if(conversation.name){
        return conversation.name
    }else {
        let name = ''
        
        for (let i = 0; i < conversation.members.length; i++){
            if(conversation.members[i].member!==user_id){
                name = name +' '+ conversation.members[i].firstName + ' '+conversation.members[i].lastName + ','
            }

        }
        console.log(name[name.length-1])
        if (name[name.length-1] === ','){
            
            return name.slice(0,name.length -1)
        }
        console.log('name',name)
        return name
    }
}