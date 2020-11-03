//Animation text
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };



//API connection
const contentDiv = document.getElementById('content');
const apiUrl = fetch('https://www.edeka.de/eh/service/eh/offers');

apiUrl
  .then(response => response.json())
  .then(content => {
      console.log(content);
      let htmlRepresentation = "";  
      content.docs.forEach(element => {
        htmlRepresentation += `
        
 

        <div class="item">
            <div class="card h-100" style="width: 18rem;">
                <img src=${element.bild_app} class="card-img-top"  alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">${element.titel}</h5>
                <p class="card-text">${element.beschreibung}</p>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item font-weight-bold">Price: <span class="text-danger h4">${element.preis} Euro</span></spand></li>
                <li class="list-group-item text-muted">Basic Price: <span class="text-danger">${element.basicPrice} Euro</span></spand></li>
                </ul>
                <div class="card-body">
                <a href="#" class="card-link">Add to Basket</a>
                </div>
            </div>
        </div>
       

      `;
      });

      return htmlRepresentation;
  })
  .then(htmlRepresetation =>{
        contentDiv.innerHTML = htmlRepresetation;

                //Owl Carousel Creation
                $('.owl-carousel').owlCarousel({
                    autoplay: true,
                    autoplayHoverPause: true,
                    margin: 100,
                    stagePadding: 10,
                    nav: true,
                    loop: true,
                    navText: [
                        "<i class='fa fa-chevron-left fa-2x'></i>",
                        "<i class='fa fa-chevron-right fa-2x'></i>"
                     ],
                    responsive:{
                        0: {
                            items: 1,
                            // dots:false
                        }, 
                        485: {
                            items: 2,
                            // dots: false
                        },
                        728: {
                            items:3,
                            // dots:true
                        },
                        960: {
                            items:3,
                            // loop: true,
                            
                        },
                        1200: {
                            items:4,
                            // dots:true,
                            // loop: false,
                            // nav: true,
                        }
                    }
                    
                });

                $('owl-carousel').on('mousewheel', 'owl-stage', function(e){
                    if(e.deltaY>0) {
                        $('.owl-carousel').trigger('next-owl');
                    } else  {
                        $('owl-carousel').trigger('prev.owl');
                    }
                    e.preventDefault();
                });

        console.log(htmlRepresetation);
    });


  //Owl Carousel Creation
//   var owl = $('.owl-carousel');
//     owl.trigger('refresh.owl.carousel');
   


    

//     <div class="card" style="width: 18rem;">
    //     <img class="card-img-top" src=${element.bild_app} alt="Card image cap">
    //     <div class="card-body">
    //         <h5 class="card-title">${element.titel}</h5>
    //         <p class="card-textt">${element.beschreibung}</p>
    //     </div>
    //     <ul class="list-group list-group-flush">
    //         <li class="list-group-item font-weight-bold">Price: <span class="text-danger h4">${element.preis} Euro</span></spand></li>
    //         <li class="list-group-item text-muted">Basic Price: <span class="h6">${element.basicPrice}</span></spand></li>
    //     </ul>
    //     <div class="card-body">
    //         <a href="#" class="card-link">Add to Basket</a>
    //     </div>
//      </div>