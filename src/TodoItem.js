import React, { Component } from 'react'
class TodoItem extends Component {
  //继承props
  constructor(props) {
    super(props)
    this.removeItem = this.removeItem.bind(this)
  }


  //子组件通过方法向父组件通信
  removeItem() {
    const { it_delete, it_index } = this.props
    it_delete(it_index)
  }
  render() {
    const { content } = this.props
    return (
      // 父组件通过属性传递,子组件通过props接收 
      < div > {content} < button onClick={this.removeItem} >x</button></div >
    )
  }
}
export default TodoItem