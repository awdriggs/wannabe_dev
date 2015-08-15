// tickeer update

console.log('ticker update working');

$(function() {
    $("#webticker").webTicker();
    $("#webticker2").webTicker({
        duplicate: true,
        speed: 40,
        direction: 'right',
        rssurl: 'http://yourwebsite.com/rss/',
        rssfrequency: 1,
        startEmpty: false,
        hoverpause: false
    });

    $("#stop").click(function() {
        $("#webticker").webTicker('stop');
    });

    $("#continue").click(function() {
        $("#webticker").webTicker('cont');
    });

    //put an a class with the ticker symbols and values, maybe this is just passed from the sim? through sockets into the client.

    $("#update").click(function() {
        $("#webticker").webTicker('update', '<li id="item1">First News Item Updated</li><li id="item3">Third News Item Updated</li><li id="item4">Fourth News Item Updated</li><li id="item9">Ninth News Item Updated</li><li id="itemnew1">This is New Item 1</li><li  id="itemnew2">This is New Item 2</li><li  id="itemnew3">This is New Item 3</li><li  id="itemnew4">This is New Item 4</li>', 'swap');
    });
});