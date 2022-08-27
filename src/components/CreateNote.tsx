import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNoteSchema, CreateNoteVariables } from '../common/validation/note';
import Input from './Input';
import Textarea from './Textarea';
import { useEffect } from 'react';

const TETAREA_PLACEHOLDER = 
`- Bananas
- Strawberries
`;

interface CreateNoteProps {
  onSubmit: (data: CreateNoteVariables) => Promise<void>
}

function CreateNote({ onSubmit }: CreateNoteProps) {

  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm<CreateNoteVariables>({
    resolver: zodResolver(createNoteSchema)
  });

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);


  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center"
    >
      <div className="card rounded-none w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
                Create new note!
          </h2>
          <Input 
            label="Note title" 
            placeholder="Grocery" 
            hookFormProps={register('title')}
            error={errors.title}
          />
          <Textarea
            label="Note content"
            placeholder={TETAREA_PLACEHOLDER}
            hookFormProps={register('content')}
            error={errors.content}
          />
          <div className="card-actions items-center justify-end">
            <button className="btn btn-primary" type="submit">
                  Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreateNote;