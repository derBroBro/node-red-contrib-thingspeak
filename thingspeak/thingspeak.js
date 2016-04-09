var https = require('https');

module.exports = function(RED) {
  function ThingspeakSendSimple(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.on('input', function(msg) {
      https.get(
        "https://api.thingspeak.com/update?api_key="+config.writekey+"&field"+config.fieldid+"="+msg.payload,
        function(response) {
          if(response.statusCode == 200){
            node.log("OK");
          } else {
            node.error("Got "+response.statusCode);
          }
        }
      );
    });
  }
  RED.nodes.registerType("ThingspeakSendSimple", ThingspeakSendSimple);
}
