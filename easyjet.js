
var casper = require('casper').create({
    pageSettings: {
        loadImages:  false,
        loadPlugins: false,
        javascriptEnabled: true,
        userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36'
    },
    //timeout: 10000,
    viewportSize: {width: 800, height: 600},
    waitTimeout: 10000,
    logLevel: "info",
    verbose: true
});

casper.on('page.error', function(msg, trace) {
   this.echo('Error: ' + msg, 'ERROR');
   for(var i=0; i<trace.length; i++) {
       var step = trace[i];
       this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
   }
});

casper.start("http://www.easyjet.com/fr/searchpod.mvc/showborderless3?aclwidth=279", function () {
    this.fill('#searchPodSlider', {
        acOriginAirport: 'Genève GVA',
        acDestinationAirport: 'Stockholm ARN',
        oDate: '05/12/2014',
        rDate: '07/12/2014',
        numberOfAdults: 2,
        numberOfChildren: 0,
        numberOfInfants: 0
    }, false);
    
    this.click('#searchPodSubmitButton');
});

casper.waitForSelector('form[action="/FR/Booking.mvc/SubmitStep1"]', function() {
    this.evaluate(function() {
        return console.log(document.body);
    });
});

casper.run(function () {
    
});
