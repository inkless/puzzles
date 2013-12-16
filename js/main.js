;(function() {

    'use strict';

    var _puzzleHtml = $("#puzzleHtml").html();

    var _puzzleAnwser = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'
    ];

    var Puzzles = function(total) {
        this.puzzles = [];
        for (var i=1; i<=total; ++i) {
            this.initOne(i);
        }
        this.total = total;
        this.curIndex = 1;
    };

    Puzzles.prototype.showByIndex = function(index) {
        
    };

    Puzzles.prototype.showNext = function() {

        this.puzzles[this.curIndex - 1].modal('hide');

        if (this.curIndex >= this.total) {
            this.endCb();
            return;
        }

        var me = this;
        setTimeout(function() {
            me.open(me.curIndex++);
        }, 500)
    };

    Puzzles.prototype.submit = function(anwser) {
        if (anwser == _puzzleAnwser[this.curIndex - 1]) {
            this.puzzles[this.curIndex - 1].find("form .form-group").removeClass("has-error");
            this.showNext();
        } else {
            this.puzzles[this.curIndex - 1].find("form .form-group").addClass("has-error");
        }
    };

    Puzzles.prototype.initOne = function (index) {
        var $puzzle = $(_puzzleHtml).appendTo(".puzzles");
        $puzzle.attr("id", "puzzle-"+index);

        $puzzle.find(".modal-title").html('Puzzle '+index);
        $puzzle.find(".modal-body").html($("#puzzle-"+index+"-tpl").html());

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
    };

    Puzzles.prototype.setEndCb = function(cb) {
        this.endCb = cb || $.noop;
    };

    window.Puzzles = Puzzles;

})();


$(document).ready(function() {

    setTimeout(function() {
        $(".cover").css("top", '-100%');
    }, 2000);

    var puzzles = new Puzzles(2);
    puzzles.setEndCb(function() {
        alert('end');
    })

    $(".cover").on("transitionEnd webkitTransitionEnd oTransitionEnd mozTransitionEnd", function() {
        puzzles.open();
    });

});