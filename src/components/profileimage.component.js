import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';
class ProfileImage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            visible: false,
            save: '',
            profileimages : [props.pic1, props.pic2, props.pic3, props.pic4, props.pic5, props.pic6]
        }
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };

    render() {
        const imagemapper = this.state.profileimages.map((image, index) =>{
            return (
            <img src = {image} style= {{ width: '171px', height: '180px'}}
                onClick = {() => {
                    this.props.onChangeImage(image);
                    this.setState({
                        save : this.props.onChangeImage(image)
                    })  
                }
                }
            />
            )
        })
        return (
            <div>
                <Button type="primary" 
                    shape="round" 
                    onClick={this.showModal}
                    style={{ fontFamily: "Georgia", fontSize:20, position: 'fixed', left: '13%', bottom: 250, transform: 'translateX(-10%)' }}
                >
                Profile Image
                </Button>
                <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                    {() => {console.log("image"+imagemapper)}}
                {imagemapper}
                </Modal>
            </div>
        );
    }
}



export default ProfileImage;