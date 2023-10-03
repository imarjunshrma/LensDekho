import {
    atom
} from 'recoil';


export const cartState=atom({
    key: "cart",
    default: []
})

export const wishListState=atom({
    key:"wishlist",
    default:[]
})

export const searchResultState=atom({
    key:'searchResult',
    default:{}
})

export const inputValue=atom({
    key:"inputvalue",
    default:""
})
// export const addToCart=()=>{

// }
// export const addToBag = selector({
//     key: 'addToBag', // unique ID (with respect to other atoms/selectors)
//     get: ({get}) => {
//       const value = get(cartState);
  
      
//     },
//   });
//add to bag
//remove to bag
//remove item from bag


//recoil
// const [state,setState]=useRecoilState
// const value=useRecoilValue
// const setState=useSetRecoilState

