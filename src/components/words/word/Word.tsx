import { selectEntities } from "@/lib/features/wordsSlice";
import { useAppSelector } from "@/lib/hooks";

function Word({ id }: { id: string }) {

  const entities = useAppSelector(selectEntities);
  const entity = entities[id];

  return (entity.display &&
    <div id={id} className={`word ${entity.status}`}>
        {entity.word}
    </div>
  );

}

export default Word;
