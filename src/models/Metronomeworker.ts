export class WorkerState {
  timerID: number ;
  interval: number;
}
export class MetronomeWorker extends WorkerState{
	timerID = 0;
  interval = 100;
  window = 

  // render(){
    window.addEventListener('message', e => {
      if (e.data=="start") {
        // console.log("starting");
        this.timerID=setInterval(function(){window.parent.postMessage("tick", '*');},this.interval)
      }
      else if (e.data.interval) {
        console.log("setting interval");
        this.interval=e.data.interval;
        console.log("interval="+this.interval);
        if (this.timerID) {
          clearInterval(this.timerID);
          this.timerID=setInterval(function(){window.parent.postMessage("tick", '*');},this.interval)
        }
      }
      else if (e.data=="stop") {
        // console.log("stopping");
        clearInterval(this.timerID);
        this.timerID=null;
      }
    })
  // }
		
}
