;(function() {

    'use strict';

    var _puzzleHtml = $("#puzzleHtml").html();

    var _puzzleAnwser = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
    ];

    var _puzzleHint = [{
        content: 'aaaa'
    }, {
        title: 'title',
        content: 'bbbb'
    }];

    var _puzzleContent = [{
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTXL3HcL0EXrn4MKO5NjTztF0ofPuAItf39qdt8d58O4a7duPiT',
        text: 'One Body'
    }, {
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTXL3HcL0EXrn4MKO5NjTztF0ofPuAItf39qdt8d58O4a7duPiT',
        text: 'Two Body'
    }];

    var Puzzles = function(total) {
        this.puzzles = [];
        for (var i=0; i<total; ++i) {
            this.initOne(i);
        }
        this.total = total;
        this.curIndex = 0;
    };

    Puzzles.prototype.showByIndex = function(index) {
        this.puzzles[this.curIndex].modal('hide');
        this.open(this.curIndex);
    };

    Puzzles.prototype.showNext = function() {

        this.puzzles[this.curIndex].modal('hide');

        if (this.curIndex >= this.total - 1) {
            this.endCb();
            return;
        }

        var me = this;
        setTimeout(function() {
            me.open(me.curIndex + 1);
        }, 500)
    };

    Puzzles.prototype.submit = function(anwser) {
        if (anwser == _puzzleAnwser[this.curIndex]) {
            this.puzzles[this.curIndex].find("form .form-group").removeClass("has-error");
            this.showNext();
        } else {
            this.puzzles[this.curIndex].find("form .form-group").addClass("has-error");
        }
    };

    Puzzles.prototype.initOne = function (index) {
        var $puzzle = $(_puzzleHtml).appendTo(".puzzles");
        $puzzle.attr("id", "puzzle-"+index);

        $puzzle.find(".modal-title").html('Puzzle '+index);
        var content = "";
        if (_puzzleContent[index].img) {
            content += [
                '<p><img src="', _puzzleContent[index].img, '" /></p>'
            ].join("");
        }
        content +=[
            '<p>', _puzzleContent[index].text, '</p>'
        ].join("");

        $puzzle.find(".modal-body").html(content);
        $puzzle.find(".hint").popover(_puzzleHint[index]);

        var me = this;
        $puzzle.find("form").on("submit", function(e) {
            e.preventDefault();
            me.submit(this.anwser.value);
        });

        this.puzzles.push($puzzle);
    };

    Puzzles.prototype.open = function(index) {
        index = index || 0;
        this.puzzles[index].modal({
          keyboard: false,
          backdrop: 'static'
        });
        this.curIndex = index;
    };

    Puzzles.prototype.setEndCb = function(cb) {
        this.endCb = cb || $.noop; // function() {};
    };

    window.Puzzles = Puzzles;

})();


$(document).ready(function() {

    // fadeout cover
    setTimeout(function() {
        $(".cover").css("top", '-100%');
    }, 2000);

    var puzzles = new Puzzles(2);
    puzzles.setEndCb(function() {
        // show prize
        $(".prize").css("top", 0);
    })

    $(".cover").on("transitionEnd webkitTransitionEnd oTransitionEnd mozTransitionEnd", function() {
        // open puzzles
        puzzles.open();
    });

});
