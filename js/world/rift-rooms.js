/* C1-r2: retain one public API for the integrated rift session and Node tests. */
(function(root){const api=typeof module==='object'&&module.exports?require('./rift-room-art.js'):root.G.RiftRoomArt;if(typeof module==='object'&&module.exports)module.exports=api;if(root.G)root.G.RiftRooms=api;})(globalThis);
