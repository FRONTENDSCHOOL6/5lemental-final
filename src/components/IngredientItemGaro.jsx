import { getPbImageURL } from '@/utils/getPbImageURL';
import PocketBase from 'pocketbase';
import useStore from '../store/storeState';

const url = 'https://orimental-final.pockethost.io';
const client = new PocketBase(url);

//? item : 재료 정보 출력
//? user : 현재 회원 정보 출력(매번 출력되면 너무 소모값 클거같은데 처음 한번만 가져오게 할 수는 없을까)
//? stat : item재료를 user회원이 가지고 있는지 정보(가지고 있으면 1)
export default function IngredientItemGaro({ item, user, stat, print }) {
  const changeStateOfCartItem = useStore(
    (state) => state.changeStateOfCartItem
  );

  async function handle(handleStat) {
    try {
      await client.collection('users').update(user.id, {
        [`ingredients_keys${handleStat === 0 ? '+' : '-'}`]: item.id,
      });

      changeStateOfCartItem(item.id, handleStat ? 0 : 1);

      // handleStat === 0 ? removeUserIngredient(item.id) : addUserIngredient(item.id)
    } catch (error) {
      console.error(error);
    }
  }
  
  if(print=='Fridge'){
    return (
      //! 버튼으로 바꿔주기. 지금은 접근성 이슈 있음
    <button>
        <li
        key={item.id}
        className="-bg--fridge-gray w-32 h-16 rounded-xl flex flex-row items-center my-2"
      >
        <figure>
          <img
            src={getPbImageURL(item, 'photo')}
            className="w-12 h-12"
            alt=""
          />
          {/* <span>{item.name}</span> */}
        </figure>
        <div className="w-20 w- flex flex-row justify-center">
          <span>{item.name}</span>
        </div>
      </li>
    </button> 
    );
  }
  else{
    return (
      //! 버튼으로 바꿔주기. 지금은 접근성 이슈 있음
      stat ? (
        <li
          key={item.id}
          className="bg-sky-300 w-32 h-16 rounded-xl flex flex-row items-center my-2"
          onClick={() => {
            console.log('stat : ', stat);
            handle(stat);
          }}
        >
          <figure>
            <img
              src={getPbImageURL(item, 'photo')}
              className="w-12 h-12"
              alt=""
            />
            {/* <span>{item.name}</span> */}
          </figure>
          <div className="w-20 w- flex flex-row justify-center font-dohyeon">
            <span>{item.name}</span>
          </div>
        </li>
      ) : (
        <li
          key={item.id}
          className="-bg--fridge-gray w-32 h-16 rounded-xl flex flex-row items-center my-2"
          onClick={() => {
            console.log('stat : ', stat);
            handle(stat);
          }}
        >
          <figure>
            <img
              src={getPbImageURL(item, 'photo')}
              className="w-12 h-12"
              alt=""
            />
            {/* <span>{item.name}</span> */}
          </figure>
          <div className="w-20 w- flex flex-row justify-center font-dohyeon">
            <span>{item.name}</span>
          </div>
        </li>
      )
    );
  }
  
  }
  
