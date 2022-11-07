var trash = document.getElementsByClassName("fa-trash-o");

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const rappername = this.parentNode.parentNode.childNodes[1].innerText
        const realname = this.parentNode.parentNode.childNodes[3].innerText
        const biggestHit = this.parentNode.parentNode.childNodes[5].innerText
        const recordLabel = this.parentNode.parentNode.childNodes[7].innerText
        fetch('delete', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'rapperName': rappername,
            'realName': realname,
            'biggestHit': biggestHit,
            'recordLabel': recordLabel
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});


