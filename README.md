# PeerSurf

PeerSurf is a demo (and kind of a library) of P2P websites powered by [WebTorrent](http://webtorrent.io).

**Want to give it a shot?**

Demo here - http://matthaywardwebdesign.github.io/PeerSurf

**How to use the library**

I don't recommend using PeerSurf.js in any kind of production environment as it really hasn't been properly tested just yet. However if for some reason you wish to do so here is how you do it.

Simply set the data attributes, `data-peer` and `data-peer-file` to the info hash of the torrent and the filename respectively in one of the currently supported types:

- `<div>` Supports html files, text etc
- `<video>` Supports standard web compatible video files (note: they are fully loaded before they appear)
- `<script>` Any kind of script (Javascript etc)
- `<img>` Any web compatible image file

Example

`<img data-peer="1acbc3d17b0c1dbf934e90ceac64a7c3d54e4d08" data-peer-file="img1.jpg" />`

This would load the file img1.jpg from the torrent with the specified info hash into the `img` tag 