
        /*  TODO: One minut OTP Verification timer
        @version 1.0.0
        @author [Prawesh Kumar] */
        var gettimer = document.getElementById("timer")
        var starttimeragain = document.getElementById("starttimeragain")
        var gettime = document.getElementById("timer").getAttribute("data-timer");
        var getminut = gettime.slice(0,gettime.indexOf(":"));
        var getsecond = gettime.slice(gettime.indexOf(":") + 1, gettime.indexOf(":") + 3); 
        
        gettimer.innerHTML = "<span class='minut'>" + getminut + "</span>:<span class='second'>" + getsecond + "</span>";

        
        var mytimer = setInterval(starttimernow, 1000)
        function starttimernow(){
            if(document.getElementById("verify-otp-modal").classList.contains('show') == true){
                startrunningtimer()
            }else{
                // clearInterval(mytimer)
            }
        }

        function startrunningtimer(){ 
            sliceminut = gettimer.getElementsByClassName("minut")[0].innerHTML;
            slicesecond = gettimer.getElementsByClassName("second")[0].innerHTML;
            
            if(slicesecond == "00"){ 
                slicesecond = 59;
                if(sliceminut <= 10){
                    sliceminut = "0" + (Number(sliceminut) - 1)
                }else{
                    sliceminut = Number(sliceminut) - 1;
                }
            }else if(slicesecond <= 59){ 
                if(slicesecond <= 10){
                    slicesecond = "0" + (Number(slicesecond) - 1);
                }else{
                    slicesecond = Number(slicesecond) - 1;
                }
            }
            
            gettimer.innerHTML = "<span class='minut'>" + sliceminut + "</span>:<span class='second'>" + slicesecond + "</span>";

            if(sliceminut.length == 3 || isNaN(sliceminut) == true){
                    // console.log(sliceminut + ":" + slicesecond)
                    gettimer.innerHTML = "Times Up";
            }

        }

        starttimeragain.addEventListener("click", againtimer);

        function againtimer(){
            clearInterval(mytimer);
            var gettime = document.getElementById("timer").getAttribute("data-timer");
            var getminut = gettime.slice(0,gettime.indexOf(":"));
            var getsecond = gettime.slice(gettime.indexOf(":") + 1, gettime.indexOf(":") + 3);
            // alert(getminut + ':' + getsecond);
            gettimer.innerHTML = "<span class='minut'>" + getminut + "</span>:<span class='second'>" + getsecond + "</span>";
            var mytimer
        }

    