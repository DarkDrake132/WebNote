let isUsernameCheck = false;
let isConfirmPasswordCheck = false;

let usernameConfirmCHange = false;

function checkUsernameExist(username){
    $.getJSON('/api/users/is-exist', {username}, function(data){
        if(data){
            $('#username-info').addClass('error').removeClass('success').html('User name has already been taken');
            isUsernameCheck = false;
        }
        else if (username === ''){
            $('#username-info').addClass('error').removeClass('success').html('Please fill this one');
            isUsernameCheck = false;
        }
        else{
            $('#username-info').addClass('success').removeClass('error').html('You can take this username');
            isUsernameCheck = true;
        }
    });
}

function checkUsernameExist2(username){
    $.getJSON('/api/users/is-exist', {username}, function(data){
        if(data){
            $('#username-check').addClass('success').removeClass('error').html('');
            
            usernameConfirmCHange = true;
            console.log(usernameConfirmCHange);
        }
        else if (username === ''){
            $('#username-check').addClass('error').removeClass('success').html('Please fill this one');
            usernameConfirmCHange = false;
        }
        else{
            $('#username-check').addClass('error').removeClass('success').html('There is no username like this!');
            usernameConfirmCHange = false;
        }
    });
}

function checkConfirmPassword(con_password){
    let password = document.getElementById('password').value;
    console.log(password);
    if(con_password === password)
    {
        $('#password-confirm').removeClass('error').html('');
        isConfirmPasswordCheck = true;
    }
    else{
        $('#password-confirm').addClass('error').html('Please check your password again');
        isConfirmPasswordCheck = false;
    }
}

function makeBoolFalse(){
    isConfirmPasswordCheck = false;
}

function checkValid(){
    if(isUsernameCheck && isConfirmPasswordCheck)
    {
        return true;
    }
    return false;
}

function CheckValidUser(){
    console.log(usernameConfirmCHange);
    if(usernameConfirmCHange)
    {
        return true;
    }
    return false;
}

function ChangeImage(image_link){
    var image = document.getElementById('image-info');
    image.src = image_link;
}


function PassData(){
    var temp = document.getElementsByName('noteID[]');
    for (i = 0; i < temp.length; i++)
    {
        var idContent = "content" + temp[i].value;
        var content = document.getElementById(idContent).textContent;
        var idNoteContent = "noteContent" + temp[i].value;
        var noteContent = document.getElementsByName(idNoteContent);
        noteContent.value = content;

        var idTitle = "title" + temp[i].value;
        var title = document.getElementById(idTitle).textContent;
        var idNoteTitle = "noteTitle" + temp[i].value;
        var noteTitle = document.getElementsByName(idNoteTitle);
        noteTitle.value = title;
    }
    var tmp = document.getElementsByName('noteTitle3').value;
    alert(tmp);
}