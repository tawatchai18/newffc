import React, { Component } from 'react';
import './App.css';
import { Input, Icon, Button, Table, Columns, Col, Form, Card, message} from 'antd';

const FormItem = Form.Item;

const imageAmcList = [
  { key: '1', name: "ต้มยำรวมมิตร", price: "150", src: 'https://www.thai-thaifood.com/bilder/869c.jpg'},
  { key: '2', name: "ปลาหมึกไข่เค็ม", price: "100", src: 'http://food.mthai.com/app/uploads/2016/05/iStock_000050584772_Small.jpg'},
  { key: '3', name: "เป็ดยัดใส้เกาลัด", price: "220", src: 'http://suanahantraitong.justmakeweb.com/uploads/620/images/menu/File2.jpg'},
  { key: '4', name: "ปลาเนื้ออ่อนราดพริก", price: "180", src: 'https://nlovecooking.com/wp-content/uploads/2017/12/food50.jpg'},
  { key: '5', name: "ลาบหมูทอด", price: "120", src: 'https://scm-assets.constant.co/scm/unilever/e9dc924f238fa6cc29465942875fe8f0/bc10d57d-2557-4274-8a1a-423bf0f40c06.jpg'},
  { key: '6', name: "กุ้งอบเกลือ", price: "160", src: 'https://cms.kapook.com/uploads/tag/1/ID_469_5819c01cae8b2.jpg'},
  { key: '7', name: "ปลาช่อนสมุนไพร", price: "250", src: 'https://i.ytimg.com/vi/heJN8RMG-DU/hqdefault.jpg'},
  { key: '8', name: "ห่อหมกมะพร้าวอ่อน ", price: "120", src: 'https://i.ytimg.com/vi/9TT6j4qzA2E/hqdefault.jpg'},
  { key: '9', name: "ปลาทับทิมนึ่งมะนาว", price: "180", src: 'https://cms.kapook.com/uploads/tag/26/ID_25628_571f1cca6088a.jpg'},
  { key: '10', name: "ปลากระพงนึ่งซีอิ้ว ", price: "280", src: 'http://2.bp.blogspot.com/-JPopvW_MMVw/Ugr4kHSCt2I/AAAAAAAAAOI/j50CqTZUSxQ/s1600/Steamed+sea+bass+with+lemon.jpg'},
]

const handleImage = (src, width, height) => {
  return <img style = {{ width: `${width}px`, height: `${height}px`}} alt="example" src={src}/>
}

export class AppForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      telePhone: '',
      next: 'Home',
      data:[],
      order: []
    };
  }

onSubmit = (key) => {
  if (this.state.order.length === 0 ) {
    imageAmcList.map(r => {
      if(r.key === key) this.setState({order: [{key: r.key, name: r.name, price: r.price, amount: 1, src: handleImage(r.src, 65, 50)}]})
    })
  } else {
      let CheckHaveorder = false
      this.state.order.map(r => {
        if (r.key === key) CheckHaveorder = true
      })

      if (CheckHaveorder) {
        let result = []
        this.state.order.map(r => {
          if(r.key === key) {
            r.amount = r.amount 
            result.push(r)
          } else result.push(r)
        })

        this.setState({order: result})
      } 
      else {
        imageAmcList.map(r => {
          if(r.key === key) this.setState({order: [...this.state.order, {key: r.key, name: r.name, price: r.price, amount: 1, src: handleImage(r.src, 65, 50)}]})
        })
      } 
    }
}

onPushOrder = (key) => {
  if (this.state.order.length === 0 ) {
    imageAmcList.map(r => {
      if(r.key === key) this.setState({order: [{key: r.key, name: r.name, price: r.price, amount: 1, src: handleImage(r.src, 65, 50)}]})
    })
  } else {
      let CheckHaveorder = false
      this.state.order.map(r => {
        if (r.key === key) CheckHaveorder = true
      })

      if (CheckHaveorder) {
        let result = []
        this.state.order.map(r => {
          if(r.key === key) {
            r.amount = r.amount + 1
            result.push(r)
          } else result.push(r)
        })

        this.setState({order: result})
      } 
      else {
        imageAmcList.map(r => {
          if(r.key === key) this.setState({order: [...this.state.order, {key: r.key, name: r.name, price: r.price, amount: 1, src: handleImage(r.src, 65, 50)}]}) 
        })
      } 
    }
}

onDelete = (key) => {
  if (this.state.order.length === 0 ) {
    imageAmcList.map(p => {
      if(p.key === key) this.setState({order: [{key: p.key, name: p.name, price: p.price, amount: - 1, src: handleImage(p.src, 65, 50)}]})
    })
  } else {
      let CheckHaveorder = false
      this.state.order.map(p => {
        if (p.key === key) CheckHaveorder = true
      })

      if (CheckHaveorder) {
        let result = []
        this.state.order.map(p => {
          if(p.key === key && p.amount > 1) {
            p.amount = p.amount - 1 
            result.push(p)
          } else result.push(p)
        })
        this.setState({order: result})
      } 
    }
}

onDeleting = (key) => {
  const order = [...this.state.order];
  this.setState({ order: order.filter(item => item.key !== key) });
}

columns = [
  {  
    title: 'ภาพ',
    dataIndex: 'src',
    key: 'src'
  },{
    title: 'ชื่ออาหาร',
    dataIndex: 'name',
    key: 'name'
  },{
    title: 'ราคา',
    dataIndex: 'price',
    key: 'price'
  },{
    title: '',
    dataIndex: 'key',
    key: 'action',
    render: (key) => {
      return(
        <Button onClick={() => this.onSubmit(key)}>+</Button>
      )
    }, 
  } 
]

column = [
    {  
      title: 'ภาพ',
      dataIndex: 'src',
      key: 'src',
    },{
      title: 'ชื่ออาหาร',
      dataIndex: 'name',
      key: 'name'
    },{
      title: 'ราคา',
      dataIndex: 'price',
      key: 'price'
    } ,{
      title: '',
      dataIndex: 'key',
      key: 'action',
      width: 50,
      render: (key) => {
        return(
          <Button onClick={() => this.onPushOrder(key)}>+</Button>
        )
      }, 
    } ,{
      title: 'จำนวน',
      dataIndex: 'amount',
      key: 'amount',
      width: 50
    },{
      title: '',
      dataIndex: 'key',
      key: 'action',
      render: (key) => {
        return(
          <Button onClick={() => this.onDelete(key)}>-</Button>
        )
      },
    },{
      title: '',
      dataIndex: 'key',
      key: 'action',
      render: (key) => {
        return(
          <Icon onClick={() => this.onDeleting(key)} type="delete" />
        )
      },
      width: 150, 
    }  
  ]

  columnn = [
    {  
      title: 'ภาพ',
      dataIndex: 'src',
      key: 'src',
    },{
      title: 'ชื่ออาหาร',
      dataIndex: 'name',
      key: 'name'
    },{
      title: 'ราคา',
      dataIndex: 'price',
      key: 'price'
    } ,{
      title: 'จำนวน',
      dataIndex: 'amount',
      key: 'amount'
    }  
  ]
  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
    this.setState({telePhone: '' });
  }

  emitEmp = () => {
    this.telePhoneInput.focus();
    this.setState({telePhone: '' });
  }
  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value});
  }

  onChangeTelePhone = (p) => {
    this.setState({telePhone: p.target.value})
  }

  handleHo = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({next: 'q'})
      }
    });
    
  }

  handleA = (key) => {
    if(this.state.order.length > 0) this.setState({next: 'a'})
    else message.error('Select your order')
      
    }

  handleH = () => {
    this.setState({userName: '', telePhone:'',  next: 'Home'})
  }
  
  handles = () => {
    this.setState({next: 's'})
    this.setState({ order: [] })
  }

  CalculateAmount = () => {
    let price = 0

    if(this.state.order !== 0) {
      this.state.order.map(r => {
        price = price + (r.price * r.amount)
      })
    }
    return price
  }

  test = () => {
    const { getFieldDecorator } = this.props.form;
    if(this.state.next === 'q') {
      const data = imageAmcList.map(({src, key , name, price}) => ({
        key: key,
        src: handleImage(src, 360, 200),
        name: name,
        price: price

      }))
      return (
        <div>
           <div style={{marginLeft:'80%'}}><h1>{this.state.userName}</h1></div>
           <div style={{marginLeft:'80%'}}><h1>{this.state.telePhone}</h1></div>
            <center>
              <Col span={12} style={{marginLeft: 10}}>
                 <h1 style={{marginTop: 50, marginLeft: 280}}>เมนูอาหาร</h1>
                <Table  style={{width:700, marginTop:50}} loading = {false} dataSource = {data} columns = {this.columns} pagination={false}/>
              </Col>
              <Col span={8} style={{marginLeft: -80}}>
                 <h1 style={{marginTop: 50, marginLeft: 280}}>รายการอาหารที่สั่ง</h1>
                  <Table  style={{width:700, marginTop:50, marginLeft: 150}} loading = {false} dataSource = {this.state.order}  columns = {this.column} pagination={false}
                  footer = {() => {
                    
                    return(
                      <div style={{display:'flex'}}>
                        <b style={{marginRight: 10}}>รายการสั่ง:</b>
                        <p style={{marginRight: 15}}>{this.state.order.length}</p>
                        <b>รายการ</b>
                        <b style={{marginLeft: 110 }}>ราคา</b>
                        <p style={{marginLeft: 15}}>{this.CalculateAmount()} <b style={{ marginLeft:10 }}>บาท</b></p>
                        <Button style={{marginLeft: 260}} type="primary" onClick={this.handleA}>สั่งอาหาร</Button>
                      </div>
                    )
                  }}
                />
              </Col>
            </center>
          </div>
    )
    } else if (this.state.next === 'Home') {
      return (
        <div>
          <div style={{marginTop:100, }}>
              <center>
                <b className="App-intro">เข้าสู่ระบบ</b>
              </center>
          </div>
          <center>
            <Form onSubmit={this.handleHo} className="login-form">
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <div style={{marginTop:20, width:360}}> 
                  <Input 
                  placeholder="Enter your username"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={this.state.suffix}
                  value={this.state.userName}
                  onChange={this.onChangeUserName}
                  ref={node => this.userNameInput = node}
                  placeholder="Username" />
                  </div>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('Telephone', {
                  rules: [{ required: true, message: 'Please input your Telephone!' }],
                })(
                  <div style={{marginTop:15, width:360}}> 
                  <Input 
                    placeholder="Enter Telephone"
                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={this.state.suffix}
                    value={this.state.telePhone}
                    onChange={this.onChangeTelePhone}
                    ref={node => this.telePhoneInput = node} 
                    placeholder="Telephone" />
                    </div>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
              </FormItem>
            </Form>
          </center>
        </div>
        )
    } else if(this.state.next === 'a') {
      return (
        <div>
           <center>
              <h1 style={{marginTop: 50}}>ใบเสร็จ</h1>
              <div><h1>{this.state.userName}</h1></div>
              <div><h1>{this.state.userName}</h1></div>
              <Table  style={{ width:700, marginTop:50}} loading = {false} dataSource = {this.state.order}  columns = {this.columnn} pagination={false}
                footer = {() => { 
                  return(
                      <div style={{display:'flex'}}>
                        <b style={{marginRight: 10}}>รายการสั่ง:</b>
                        <p style={{marginRight: 15}}>{this.state.order.length}</p>
                        <b>รายการ</b>
                        <b style={{marginLeft: 276 }}>ราคา</b>
                        <p style={{marginLeft: 15}}>{this.CalculateAmount()} <b style={{ marginLeft:10 }}>บาท</b></p>
                      </div>
                  )
                }}
              />
              <Button style={{marginTop:20, marginLeft: 580}} type="primary" onClick={this.handleHo}>กลับ</Button>
              {'\xa0\xa0\xa0'}
              <Button type="primary" onClick={this.handles}>ตกลง</Button>
          </center>
        </div>
      )
    } else if (this.state.next === 's'){
      return (
        <center>
          <Card style={{ width: 300, marginTop: 40 }}>
            <h1>กรุณารอรับสินค้า</h1>
            <Button style={{marginTop:20}} type="primary" onClick={this.handleH}>กลับหน้าหลัก</Button>
          </Card>
        </center>
      )
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userName, telePhone } = this.state;
    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty}/> : null;

    return (
      <div style={{}}>
        <div className="App">
          <div style={{marginTop:10, backgroundColor: "black"}}>
          <center style={{backgroundColor: "black"}}><img src="codefin.png" style={{width:200}}/></center>
            <h1 style={{marginTop:15, backgroundColor: "black", color:"#fff", fontSize:40}}>Codefin Food Center</h1>
          </div>
        </div >
        {this.test()}
      </div>
    );
  }
}
const App = Form.create()(AppForm);

export default App;


