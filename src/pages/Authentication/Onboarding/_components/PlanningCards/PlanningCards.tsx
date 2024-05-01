import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UncheckedIcon from '@/components/Shared/Icons/UncheckedIcon';
import CheckedIcon from '@/components/Shared/Icons/CheckedIcon';
import ForSchoolIcon from '@/components/Shared/Icons/ForSchoolIcon';
import ForTeamIcon from '@/components/Shared/Icons/ForTeamIcon';
import ForPersonalIcon from '@/components/Shared/Icons/ForPersonalIcon';

interface Props {
  selectedId: number;
  handleClick: (id: number) => void;
}

export default function PlanningToUse({ selectedId, handleClick }: Props) {
  const cardStyle =
    'w-[230px] h-full bg-white flex flex-col rounded-[5px] border-gray-300 relative p-auto';
  const boxShadow1 =
    'rgb(35, 131, 226) 0px 0px 0px 2px, rgba(182, 182, 182, 0.25) 0px 8px 12px';
  const boxShadow2 =
    'rgba(55, 53, 47, 0.16) 0px 0px 0px 1px, rgba(167, 167, 167, 0.25) 0px 1px 2px';

  return (
    <div className="flex gap-5 items-center justify-center mb-5">
      <Card
        className={`${cardStyle} ${
          selectedId === 1 ? 'opacity-100' : 'opacity-60 hover:opacity-100'
        } transition-all`}
        onClick={() => handleClick(1)}
        style={{
          boxShadow: selectedId === 1 ? boxShadow1 : boxShadow2,
        }}
      >
        <div className="absolute right-2 top-2">
          {selectedId === 1 ? <CheckedIcon /> : <UncheckedIcon />}
        </div>
        <CardHeader className="flex flex-col justify-center items-center gap-4">
          <ForTeamIcon className="w-[90px]" />
          <CardTitle>For my team</CardTitle>
        </CardHeader>
        <CardContent
          className="flex w-full mb-2 text-center "
          style={{
            color: 'rgba(55, 53, 47, 0.7)',
            fontSize: '14px',
            lineHeight: 1.4,
          }}
        >
          Collaborate on your docs, projects, and wikis.
        </CardContent>
      </Card>
      <Card
        className={`${cardStyle} ${
          selectedId === 2 ? 'opacity-100' : 'opacity-60 hover:opacity-100'
        } transition-all`}
        onClick={() => handleClick(2)}
        style={{
          boxShadow: selectedId === 2 ? boxShadow1 : boxShadow2,
        }}
      >
        <div className="absolute right-2 top-2">
          {selectedId === 2 ? <CheckedIcon /> : <UncheckedIcon />}
        </div>
        <CardHeader className="flex flex-col justify-center items-center gap-8">
          <ForPersonalIcon className="w-[90px]" />
          <CardTitle>For personal use</CardTitle>
        </CardHeader>
        <CardContent
          className="flex w-full mb-2 text-center"
          style={{
            color: 'rgba(55, 53, 47, 0.7)',
            fontSize: '14px',
            lineHeight: 1.4,
          }}
        >
          Write better. Think more clearly. Stay organized.
        </CardContent>
      </Card>
      <Card
        className={`${cardStyle} ${
          selectedId === 3 ? 'opacity-100' : 'opacity-60 hover:opacity-100'
        } transition-all`}
        onClick={() => handleClick(3)}
        style={{
          boxShadow: selectedId === 3 ? boxShadow1 : boxShadow2,
        }}
      >
        <div className="absolute right-2 top-2">
          {selectedId === 3 ? <CheckedIcon /> : <UncheckedIcon />}
        </div>
        <CardHeader className="flex flex-col justify-center items-center gap-8">
          <ForSchoolIcon className="w-[90px]" />
          <CardTitle>For school</CardTitle>
        </CardHeader>
        <CardContent
          className="flex w-full mb-2 text-center"
          style={{
            color: 'rgba(55, 53, 47, 0.7)',
            fontSize: '14px',
            lineHeight: 1.4,
          }}
        >
          Keep your notes, research, and tasks all in one place.
        </CardContent>
      </Card>
    </div>
  );
}

function PlanningCards({}) {}
