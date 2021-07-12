let tab = function() {  // Get all the classes with needed names and one variable.
    let tabNav = document.querySelectorAll(
        '.tabs-nav__item'),
        tabContent = document.querySelectorAll('.tab'),
        tabName;

    tabNav.forEach(item => { // iterate over the items of tabNav to make them react on click event
        item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() { // choosing tabNav object when any of them clicked
        tabNav.forEach(item => {
            item.classList.remove('is-active')
        });
        console.log(this);
        this.classList.add('is-active'); // adding class is-active to the pressed tab
        tabName = this.getAttribute('data-tab-name'); // giving tabName to choose which content to present
        console.log(tabName);
        selectTabContent(tabName); // last function to call
    }
     
    function selectTabContent(tabName) { // choosing content depending on a pressed tab
        tabContent.forEach(item => {
            item.classList.contains(tabName)? item.classList.add('is-active'): // make needed tab concent active and show to user
            item.classList.remove('is-active'); // remove is-active from the tab content which doesn't have tabName var in class name
        })
    }

};

tab(); // Calling a function


'use strict';
    var multiItemSlider = (function () {
      return function (selector, config) {
        var
          _mainElement = document.querySelector(selector), // main element of the block
          _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // wrapper of the slider__item
          _sliderItems = _mainElement.querySelectorAll('.slider__item'), // elements of the slider__item
          _sliderControls = _mainElement.querySelectorAll('.slider__control'), // controls for the slider
          _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // left button
          _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // right button
          _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // width of the wrapper
          _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // width of the one element
          _positionLeftItem = 0, // position of the left active item
          _transform = 0, // var of the transform of wrapper .slider__wrapper
          _step = _itemWidth / _wrapperWidth * 100, // size of the step for transformation
          _items = [], // array for elements
          _interval = 0, 
          _config = {
            isCycling: false, // automatic change of slides
            direction: 'right', // direction of the slides change
            interval: 5000, // interval for slides change
            pause: true //if to pause when mouse is on slider
          };

        for (var key in config) {
          if (key in _config) {
            _config[key] = config[key];
          }
        }

        // getting values for slider items
        _sliderItems.forEach(function (item, index) {
          _items.push({ item: item, position: index, transform: 0 });
        });

        var position = {
          getItemMin: function () {
            var indexItem = 0;
            _items.forEach(function (item, index) {
              if (item.position < _items[indexItem].position) {
                indexItem = index;
              }
            });
            return indexItem;
          },
          getItemMax: function () {
            var indexItem = 0;
            _items.forEach(function (item, index) {
              if (item.position > _items[indexItem].position) {
                indexItem = index;
              }
            });
            return indexItem;
          },
          getMin: function () {
            return _items[position.getItemMin()].position;
          },
          getMax: function () {
            return _items[position.getItemMax()].position;
          }
        }

        var _transformItem = function (direction) {
          var nextItem;
          if (direction === 'right') {
            _positionLeftItem++;
            if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
              nextItem = position.getItemMin();
              _items[nextItem].position = position.getMax() + 1;
              _items[nextItem].transform += _items.length * 100;
              _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
            }
            _transform -= _step;
          }
          if (direction === 'left') {
            _positionLeftItem--;
            if (_positionLeftItem < position.getMin()) {
              nextItem = position.getItemMax();
              _items[nextItem].position = position.getMin() - 1;
              _items[nextItem].transform -= _items.length * 100;
              _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
            }
            _transform += _step;
          }
          _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        }

        var _cycle = function (direction) {
          if (!_config.isCycling) {
            return;
          }
          _interval = setInterval(function () {
            _transformItem(direction);
          }, _config.interval);
        }

        // processing the comands "back" and "forward"
        var _controlClick = function (e) {
          if (e.target.classList.contains('slider__control')) {
            e.preventDefault();
            var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
            _transformItem(direction);
            clearInterval(_interval);
            _cycle(_config.direction);
          }
        };

        var _setUpListeners = function () {
         
          _sliderControls.forEach(function (item) {
            item.addEventListener('click', _controlClick);
          });
          if (_config.pause && _config.isCycling) {
            _mainElement.addEventListener('mouseenter', function () {
              clearInterval(_interval);
            });
            _mainElement.addEventListener('mouseleave', function () {
              clearInterval(_interval);
              _cycle(_config.direction);
            });
          }
        }

     
        _setUpListeners();
        _cycle(_config.direction);

        return {
          right: function () { 
            _transformItem('right');
          },
          left: function () { 
            _transformItem('left');
          },
          stop: function () { 
            _config.isCycling = false;
            clearInterval(_interval);
          },
          cycle: function () { 
            _config.isCycling = true;
            clearInterval(_interval);
            _cycle();
          }
        }

      }
    }());

    var slider = multiItemSlider('.slider', {
      isCycling: true
    })


function navigation() {
    var x = document.getElementById('topnav');
    if (x.className === 'nav') {
        x.className += ' responsive';
    }
    else{
        x.className = 'nav';
    }
}