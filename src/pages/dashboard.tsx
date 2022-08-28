import type { NextPage } from 'next';
import { useSession, signOut, getSession } from 'next-auth/react';
import Head from 'next/head';
import { prisma } from '../common/prisma';
import { requireAuth } from '../common/requireAuth';
import CreateNote from '../components/CreateNote';
import Navbar from '../components/Navbar';
import { InferGetServerSidePropsType } from 'next';
import { useCallback, useState } from 'react';
import { CreateNoteVariables } from '../common/validation/note';
import { trpc } from '../common/client/trpc';
import NoteCard from '../components/NoteCard';
import { Note } from '@prisma/client';

type DashboardProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Dashboard: NextPage = (props: DashboardProps) => {
  const { data } = useSession();

  const [notes, setNotes] = useState<Note[]>(props.notes);  

  const { mutateAsync: createNote } = trpc.useMutation(['note.create']);
  const { mutateAsync: deleteNote } = trpc.useMutation(['note.delete']);

  const onSubmit = useCallback(async (data: CreateNoteVariables) => {
    try {
      const res = await createNote(data);
      setNotes(pn => [res.result.note, ...pn]);
    }catch(e) {
      console.log(e);
    }
  }, [createNote]);

  const onDelete = useCallback(async (noteId: string) => {
    try {
      const res = await deleteNote({ noteId });
      setNotes(pn => pn.filter(n => n.id !== res.result));
    }catch(e) {
      console.log(e);
    }
  }, [deleteNote]);

  return (
    <>
      <Head>
        <title>nts - Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-base-200 flex flex-col items-center">
        <Navbar username={(data?.username as string)} signOut={signOut} />
        <div className={'px-4 pb-10 lg:items-start items-center pt-10 gap-10 lg:gap-4 lg:pt-20 flex flex-col-reverse lg:flex-row w-full max-w-7xl'}>
          {notes && 
            (notes.length === 0  ?
              <div className="flex-1 h-full flex flex-col gap-4 items-center">
                <img src="/void.svg" className="w-60" />
                <h2 style={{ fontFamily: 'sacramento' }} className="text-7xl">no notes</h2>
              </div> : 
              <div
                style={{}} 
                className='lg:flex-1 w-full flex flex-col gap-4'>
                {notes.map(n => <NoteCard key={n.id} note={n} onDelete={onDelete} />)}
              </div>  
            )
          }
          <CreateNote onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = requireAuth(async (ctx) => {
  
  const session = await getSession(ctx);

  const userId = session!.id as string;

  const notes = await prisma.note.findMany({
    where: {
      userId
    }
  });

  return {
    props: {
      notes: notes.reverse()
    }
  };
});

export default Dashboard;