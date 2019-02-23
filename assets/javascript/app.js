(function appFunction(){
    var questionList = ["In what place was Chrismas once Illegal?","In California, it is illegal to eat oranges while doing what?", "Coulrophobia means fear of what?",
"Every year, over 8,800 people injure themselves with what apparently harmless, tiny object?","At what temperature are Fahrenheit and Celsius the same?",
'What did the "D" in "D-Day" stand for?', "This quiz was easy to make."];
    var answerList = [["England","France", "Brazil", "Russia"],["Gardening","Bathing", "Driving", "Working on a computer"],["Pointy Objects", "Clowns", "Heights", "Old People"],
["Pencil", "Knife", "Toothpick", "Computer Mouse"], ["-40", "50", "0", "92"], ["Doom", "Day", "Dwight Eisenhower", "Dunkirk"], ["True", "False"]];
    var selectedAns = [null,null,null,null,null,null,null];
    var correctAnsList =["England","Bathing", "Clowns", "Toothpick", "-40", "Day", "True"];

    window.onload = function(){
        $("#start").click(function(){
            document.getElementById("content").innerHTML = "";

            var time=30;

            var timer = $("<div>");
            timer.addClass("timer");
            timer.attr("id","timer");
            timer.text("Time Remaining: " + time + " Seconds");
            $("#content").append(timer);

            var counter=setInterval(countdown, 1000);
            function countdown() {
                time=time-1;
                $("#timer").text("Time Remaining: " + time + " Seconds");
                if (time <= 0)
                {
                    clearInterval(counter);
                    var results = checkAnswers();
                    document.getElementById("content").innerHTML = "All Done!";

                    var resultbox = $("<div>");
                    resultbox.addClass("resultbox");
                    resultbox.attr("id","resultbox");
                    resultbox.text("Correct Answers: " + results[0] + "\n" + "Incorrect Answers: " + results[1] + "\n" + "Unanswered: " + results[2] + "\n");
                    resultbox.html(resultbox.html().replace(/\n/g,'<br/>'));
                    $("#content").append(resultbox);
        
                    return;
                }

            }



            for (let i = 1; i < questionList.length+1; i++) {
                var question = $("<div>");
                question.addClass("question");
                question.attr("data-num", i-1);
                question.text(questionList[i-1]);
                $("#content").append(question);

                var answers = $("<div>");
                answers.addClass("answers");
                answers.attr("id", "answers"+i);
                $("#content").append(answers);

                for (let j = 1; j < answerList[i-1].length+1; j++) {
                    var answerbtn = $('<input type="radio" name="answer' + i +'">');
                    answerbtn.addClass("ansbtn question"+ i + " answer" + j );
                    answerbtn.attr("data-value", answerList[i-1][j-1]);
                    answerbtn.attr("data-q", i-1);
                    answerbtn.attr("data-a", j-1);
                    $("#answers"+i).append(answerbtn);

                    var answer = $("<label>");
                    answer.addClass("ans question"+ i + " answer" + j );
                    answer.attr("data-value", answerList[i-1][j-1]);
                    answer.text(answerList[i-1][j-1]);
                    $("#answers"+i).append(answer);
                }
                
            }
 
            $(".ansbtn").click(function(){
                var q = $(this).attr("data-q");
                var a = $(this).attr("data-a");
                selectedAns[q] = answerList[q][a];
            })
     
        })

        function checkAnswers(){
            var results = [0,0,0];
            for (let i = 0; i < selectedAns.length; i++) {
                if (selectedAns[i] === null){
                    results[2]++;
                } else if (selectedAns[i] === correctAnsList[i]) {
                    results[0]++;
                } else {
                    results[1]++;
                }
            }
            return results;
        }
    }
}());