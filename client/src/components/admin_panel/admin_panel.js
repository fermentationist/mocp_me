import React, { Component } from 'react';
import { Grid, Row, Col, Container } from 'react-grid-system';
import logo from '../logo/logo.png';
import AdminContent from './admin_content/admin_content';

const pageStyle = {
	font:'avenir'
}
const jumboStyle = {
	background:'#FFDC65',
	borderRadius:'25px',
	padding:'30px',
	paddingTop:'50px',
	paddingBottom:'40px',
	margin:'20px',
	font:'avenir'
}
const logoStyle = {
	width:'100%'
}
const adminStyle={
	borderRadius:'25px',
	padding:'10px',
	marginTop:'15px',
	background:'white',
	paddingLeft:'13px',
	color:'#FFDC65',
}
const headStyle={
	background:'black',
	margin:'20px 20px 5px 20px',
	color:'#eaeaea',
	padding:'10px',
	borderRadius:'25px',
	font:'avenir',
	paddingLeft:'20px',
	paddingRight:'20px',
}
class AdminPanel extends Component {
  render() {
    return (
      <Container style={ pageStyle }>
    	<Row style={ jumboStyle }>
    		<Col md= { 7 } lg= { 4 }>
    			<img className='logo' src={logo} style={logoStyle} />
    		</Col>
    		<Col md= { 5 } lg= { 4 } style={{textAlign:'center'}}>
    			<h2 style={ adminStyle }>admin page</h2>
    		</Col>
    	</Row>
    	<Row style={ headStyle }>
			<Col xs={4}>
				<b>Tag:</b>
			</Col>
			<Col xs={4}>
				<b>Date Posted:</b>
			</Col>
			<Col xs={4}>
				<b>Approve:</b>
			</Col>
		</Row>
    	<Row style={{marginLeft:'20px', marginRight:'20px'}}>
    		<AdminContent 
    			tagName="#tagOne"
    			datePosted="01/23/45"
    		/>
    		<AdminContent 
    			tagName="#tagTwo"
    			datePosted="01/23/45"
    		/>
    	</Row>
      </Container>
    );
  }
}

export default AdminPanel;