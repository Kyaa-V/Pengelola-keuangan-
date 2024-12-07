import { ref} from "vue";

interface IThema {
  thema: string; 
  changeThema: () => void; 
}

const thema = ref("day"); 

export const UseThema = (): IThema => {
  const changeThema = () => {
    thema.value = thema.value === "day" ? "night" : "day";
  };

  return { thema, changeThema }; 
};
