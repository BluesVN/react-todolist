import React, { Fragment, Component } from 'react';
import TodoItem from './TodoItem'


class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      inputVal: ''
    }

    //在这里 改变方法的this指向,提高性能;
    //ES6结构赋值
    //方法解耦合抛出(例如ul里面的内容)
    this.changeInput = this.changeInput.bind(this)
    this.clickBtn = this.clickBtn.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  changeInput(e) {
    const value = e.target.value //传入函数,是异步的setState
    this.setState(() => ({ inputVal: value }))
  }
  clickBtn() {
    console.log('clickBtn', this);
    // this.setState(
    //   {
    //     list: [...this.state.list, this.state.inputVal],
    //     inputVal: ''
    //   }
    // )
    //prevState 修改数据之前的数据,避免不小心改变state
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputVal],
      inputVal: ''
    }))
  }
  handleDelete(i) {
    console.log(`删除当前第${i}项`, this.state.list);
    // const list = [...this.state.list];//不要直接修改state影响性能优化(react immutable概念)
    // list.splice(i, 1)
    // this.setState({ list })
    this.setState((prevState) => {
      const list = [...prevState];//不要直接修改state影响性能优化(react immutable概念)
      list.splice(i, 1)
      return { list }
    })
  }
  getTodoItem() {
    return (
      // index 不推荐作为key值,key值在循环的最外层
      this.state.list.map((it, index) => {
        return (
          <TodoItem
            content={it}
            key={index}
            it_index={index}
            it_delete={this.handleDelete} />
        )
      })
    )
  }
  render() {
    return (
      // react 的这个标签在审查元素的时候(ul,button,input)外面没有包裹
      <Fragment >
        <label htmlFor="inpA">输入</label>
        <input id="inpA" value={this.state.inputVal} onChange={this.changeInput} />
        {/* 当函数运行时,如果this默认指向不用bind修改的话,函数内部的this此时指向的是button这个按钮,里外this绑定,统一指向(TodoList)组件 */}
        <button style={{ background: 'yellow', color: 'blue' }} onClick={this.clickBtn}>onclick</button>
        <ul className='box'>
          {this.getTodoItem()}
        </ul>
      </Fragment>
    );
  }
}

export default TodoList;
