var PeerSurf = {};
var client;
(function () {

    var ee;
    PeerSurf.init = function (opts) {
        console.info("Loading PeerSurf");
        ee = new EventEmitter();
        //Create torrent client
        client = new WebTorrent();

        $(document).ready(function () {
            process($(document));
        });
    }

    var torrents = [];

    function torrentExists(hash) {
        for (var i = 0; i < torrents.length; i++) {
            if (torrents[i] == hash) {
                return true;
            }
        }
        return false;
    }

    function getFiles(element, callback) {
        //Get the hash of the torrent
        var hash = $(element).attr("data-peer").toString();

        var torrentFile = $(element).attr("data-peer-file").toString();
        //Check if we are already attempting to download this torrent
        if (torrentExists(hash) == false) {
            //Add torrent to torrent list
            torrents.push(hash);
            console.info("Loading torrent with info hash - " + hash + " and file - " + torrentFile);
            //Start downloading the torrent
            client.add({
                infoHash: hash,
                announce: 'wss://tracker.webtorrent.io'
            }, function (torrent) {
                //Seed the files

                torrent.files.forEach(function (file) {
                    ee.emitEvent("torrent-" + hash + "-" + file.name, [file]);
                });
            });

        } else {
            console.info("Torrent already added");
        }
        //Add an event emitter for this torrent
        ee.addListener('torrent-' + hash + "-" + torrentFile, function (file) {
            callback(element, file);
        });
    }
    
    function process(element){
        element.find('img[data-peer]').each(function (index) {
                getFiles(this, function (element, file) {
                    file.getBlobURL(function (err, url) {
                        $(element).attr("src", url);
                    });
                });
            });
            element.find('script[data-peer]').each(function (index) {
                getFiles(this, function (element, file) {
                    file.getBlobURL(function (err, url) {
                        $(element).attr("src", url);
                    });
                });
            });
            element.find('video[data-peer]').each(function (index) {
                getFiles(this, function (element, file) {
                    file.getBlobURL(function (err, url) {
                        $(element).attr("src", url);
                    });
                });
            });
            element.find('div[data-peer]').each(function (index) {
                getFiles(this, function (element, file) {
                    file.getBlobURL(function (err, url) {
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', url, true);
                        xhr.responseType = 'blob';
                        xhr.onreadystatechange = function (e) {
                            if (xhr.readyState == 4) {
                                var myBlob = this.response;
                                var reader = new FileReader();

                                reader.onloadend = function () {
                                    $(element).html(reader.result);
                                    process($(element));
                                }
                                reader.readAsText(myBlob);
                            }
                        };
                        xhr.send();
                    });
                });
            });
    }

})();