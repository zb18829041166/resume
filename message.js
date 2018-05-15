!function () {
    var view = document.querySelector(".others-content")
    console.log()
    var model={
        init:function(){
            var APP_ID = '7jUtgnPDmAujVSW2bKxJ1cM8-gzGzoHsz';
            var APP_KEY = '3graFqQmVWuNhAz1iwDnQkk2';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
            console.log('leancloud初始化成功')
        },
        getMessages:function(){               //返回promise对象
             var query = new AV.Query('Message');
             return    query.find()
        },
        saveMessages:function(name,content){               //返回promise对象
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({
                name: name,
                content: content
            })
        }
    }



    var controller = {
        view: null,
        model:null,
        init: function (view) {
            this.view = view
            this.model=model
            this.ul=view.querySelector("#messageList")
            this.form= view.querySelector("#myForm")
            this.model.init()
            this.loadMessage()
            this.bindEvents()
        },
        loadMessage:function(){
           this.model.getMessages().then((Messages)=> {
                console.log(Messages)
                var contentList = Messages.map((item) => item.attributes);
                console.log(contentList)
                contentList.forEach((item) => {
                    var li = document.createElement('li')
                    li.innerHTML = `${item.name}:${item.content}`
                    this.ul.appendChild(li)
                })
            });
        },
        bindEvents:function(){
            var myForm =this.form
            myForm.addEventListener('submit', (e)=>{
                e.preventDefault();
                var content = myForm.querySelector("input[name=content]").value
                var name = myForm.querySelector("input[name=name]").value
                this.model.saveMessages(name,content).then((object)=> {
                    console.log('存入成功')
                    var li = document.createElement('li')
                    console.log('存入成功2')
                    li.innerHTML = `${name}:${content}`
                    console.log('存入成功3')
                    console.log('存入成功4')
                    this.ul.appendChild(li)
                    myForm.querySelector("input[name=content]").value = ''
                })
            })
        }
    }
    console.log(1)
    controller.init(view,model)
    console.log(2)
}.call()




