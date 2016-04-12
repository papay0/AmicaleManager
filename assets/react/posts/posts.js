var React = require('react');
var ReactDOM = require('react-dom');

var firebaseUrl = "https://amicale2test2016.firebaseio.com/";

var Create = React.createClass({
  render:function(){
    return (
      <h2>Coucou</h2>
    )
  }
});

ReactDOM.render(
  <Create/>,
  document.getElementById('content')
);
