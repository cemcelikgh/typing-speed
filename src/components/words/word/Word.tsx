import { selectEntities } from "@/lib/features/wordsSlice";
import { useAppSelector } from "@/lib/hooks";
import styles from './Word.module.css';

function Word({ id }: { id: string }) {

  const entities = useAppSelector(selectEntities);
  const entity = entities[id];

  return (entity.display &&
    <div id={id} className={`${styles.word} ${entity.status}`}>
      {entity.word}
    </div>
  );

}

export default Word;
