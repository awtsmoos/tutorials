//B"H
function WebRTCWrapper() {
    var rtc = new RTCPeerConnection({
        iceServers: [
            {
                urls: [
                    "stun:stun.stunprotocol.org"
                ]
            }
        ]
    })

    this.addIceInfo = iceInfo => {
        var newIceObject = new RTCIceCandidate(iceInfo);
        rtc.addIceCandidate(newIceObject)
    }

    this.ontrack = e=>{

    };

    this.onice = e=>{

    };

    this.onoffer = e => {

    }

    this.onacceptedanswer = e=> {

    }

    this.oncreatedanswer = e=>{

    }

    this.addStream = stream=> {
        stream.getTracks()
        .forEach(track => {
            rtc.addTrack(
                track,
                stream
            )
        })
    }
    this.makeOffer = () => {
        rtc.createOffer()
        .then(off => {
            rtc.setLocalDescription(off)
            .then(() => {
                this.onoffer(off)
            })
            
        })
    };

    //first person
    this.acceptAnswer = (obj) => {
        rtc.setRemoteDescription(obj)
        .then(() => {
            this.onacceptedanswer(obj)
        })
    };

    //person accepting offer
    this.acceptOfferAndCreateAnswer = offer => {
        var desc = new RTCSessionDescription(offer);

        rtc.setRemoteDescription(desc)
        .then(() => {
            rtc.createAnswer()
            .then((answer) => {
                rtc.setLocalDescription(answer);
                this.oncreatedanswer(answer)
            })
        })
    }

    this.start = () => {
        rtc.addEventListener("icecandidate", e => {
            this.onice(e)
        })

        rtc.addEventListener("track", e=>{
            this.ontrack(e)
        })
    }
}
