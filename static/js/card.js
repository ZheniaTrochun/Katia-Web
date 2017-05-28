const firstCardHoverListener = () => {
  $('#card2').stop(true, true);
  $('#card3').stop(true, true);

  $('#listener1').css({'z-index': 1000});
  $('#listener2').css({'z-index': -1000});
  $('#listener3').css({'z-index': -1000});

  $('#card2').animate({left : '0px'});
  $('#card3').animate({left : '0px'});
};

const secondCardHoverListener = () => {

  $('#listener1').css({'z-index': -1000});
  $('#listener2').css({'z-index': 1000});
  $('#listener3').css({'z-index': -1000});

  $('#card1').animate({left : '309px'});
  $('#card3').animate({left : '309px'});
};

const thirdCardHoverListener = () => {
  $('#card1').stop(true, true);
  $('#card2').stop(true, true);

  $('#listener1').css({'z-index': -1000});
  $('#listener2').css({'z-index': -1000});
  $('#listener3').css({'z-index': 1000});

  $('#card1').animate({left : '618px'});
  $('#card2').animate({left : '618px'});
};

const onMouseLive = () => {
  $('#listener1').css({'z-index': 1000});
  $('#listener2').css({'z-index': 1000});
  $('#listener3').css({'z-index': 1000});

  $('#card1').animate({left : '0px'});
  $('#card2').animate({left : '309px'});
  $('#card3').animate({left : '618px'});
}
