import {Todos} from './components/todos';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
 
configure({ adapter: new Adapter() });

describe('<Todos />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Todos />)

  })

  it('has an input field', () => {
    console.log("--------------------")
    console.log(wrapper.debug())
    console.log("--------------------")
    const input = wrapper.find('.input-field')
    expect(input.props().value).toBe(undefined)
  })

  it('contains a button', () => {
    const button = <button>Add new todo</button>
    expect(wrapper.containsMatchingElement(button)).toBe(true)
  })

  it('has a text on button', () => {
    expect(wrapper.find('.button').text()).toEqual('Add new todo');
  })
})


// const setup = (props={}, state=null) => {
//   const wrapper = shallow(<App {...props} />)
//   if(state) wrapper.setState(state)
//   return wrapper
// }

// const findByTestAttr = (wrapper, value) => {
//   return wrapper.find(`[data-test="${value}"]`)
// }

// test('renders without crashing', () => {
//  const wrapper = setup()
//  const appComponent = findByTestAttr(wrapper, 'component-app')
//  expect(appComponent).toHaveLength(1)
// }); 

// test('renders increment button', () => {
//   const wrapper = setup()
//   const button = findByTestAttr(wrapper, 'increment-button')
//   expect(button).toHaveLength(1)
//  }); 

// test('renders counter display', () => {
//   const wrapper = setup()
//   const counterDisplay = findByTestAttr(wrapper, 'counter-display')
//   expect(counterDisplay).toHaveLength(1)
//  }); 

// test('counter starts at 0', () => {
//   const wrapper = setup()
//   const initialStateCounter = wrapper.state('counter')
//   expect(initialStateCounter).toBe(0)
//  }); 

// test('clicking button increments the counter display', () =>{
//   const counter = 7 
//   const wrapper = setup(null, { counter })

//   // find button and click
//   const button = findByTestAttr(wrapper, 'increment-button')
//   button.simulate('click')

//   // find display and test value
//   const counterDisplay = findByTestAttr(wrapper, 'counter-display')
//   expect(counterDisplay.text()).toContain(counter + 1)
// })