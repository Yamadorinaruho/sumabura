import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const LeagueApp = () => {
 const [teams, setTeams] = useState([]);
 const [matches, setMatches] = useState([]);
 const [newTeam, setNewTeam] = useState("");

 const addTeam = () => {
   if (newTeam.trim()) {
     setTeams([...teams, { name: newTeam, points: 0, wins: 0, losses: 0, draws: 0 }]);
     setNewTeam("");
   }
 };

 const addMatch = (team1, team2) => {
   setMatches([...matches, {
     team1,
     team2,
     score1: 0,
     score2: 0,
     played: false
   }]);
 };

 const updateMatchResult = (index, score1, score2) => {
   const updatedMatches = [...matches];
   const match = updatedMatches[index];
   match.score1 = score1;
   match.score2 = score2;
   match.played = true;
   setMatches(updatedMatches);

   const updatedTeams = [...teams];
   const team1 = updatedTeams.find(t => t.name === match.team1);
   const team2 = updatedTeams.find(t => t.name === match.team2);

   if (score1 > score2) {
     team1.points += 3;
     team1.wins += 1;
     team2.losses += 1;
   } else if (score2 > score1) {
     team2.points += 3;
     team2.wins += 1;
     team1.losses += 1;
   } else {
     team1.points += 1;
     team2.points += 1;
     team1.draws += 1;
     team2.draws += 1;
   }

   setTeams(updatedTeams.sort((a, b) => b.points - a.points));
 };

 return (
   <div className="p-4 max-w-4xl mx-auto">
     <h1 className="text-2xl font-bold mb-4">リーグ戦管理</h1>
     
     <Tabs defaultValue="teams">
       <TabsList>
         <TabsTrigger value="teams">チーム</TabsTrigger>
         <TabsTrigger value="matches">試合</TabsTrigger>
         <TabsTrigger value="standings">順位表</TabsTrigger>
       </TabsList>

       <TabsContent value="teams" className="mt-4">
         <div className="flex gap-2 mb-4">
           <Input
             value={newTeam}
             onChange={(e) => setNewTeam(e.target.value)}
             placeholder="チーム名"
             className="max-w-xs"
           />
           <Button onClick={addTeam}>追加</Button>
         </div>
         
         <table className="w-full border-collapse">
           <thead className="bg-gray-100">
             <tr>
               <th className="border p-2 text-left">チーム名</th>
             </tr>
           </thead>
           <tbody>
             {teams.map((team, i) => (
               <tr key={i} className="border-b">
                 <td className="p-2">{team.name}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </TabsContent>

       <TabsContent value="matches" className="mt-4">
         <div className="mb-4">
           {teams.length >= 2 && (
             <Button onClick={() => addMatch(teams[0].name, teams[1].name)}>
               試合追加
             </Button>
           )}
         </div>
         
         <table className="w-full border-collapse">
           <thead className="bg-gray-100">
             <tr>
               <th className="border p-2 text-left">ホーム</th>
               <th className="border p-2 text-left">スコア</th>
               <th className="border p-2 text-left">アウェイ</th>
               <th className="border p-2 text-left">状態</th>
             </tr>
           </thead>
           <tbody>
             {matches.map((match, i) => (
               <tr key={i} className="border-b">
                 <td className="p-2">{match.team1}</td>
                 <td className="p-2">
                   <div className="flex items-center gap-2">
                     <Input
                       type="number"
                       className="w-16"
                       value={match.score1}
                       onChange={(e) => updateMatchResult(i, parseInt(e.target.value), match.score2)}
                     />
                     <span>-</span>
                     <Input
                       type="number"
                       className="w-16"
                       value={match.score2}
                       onChange={(e) => updateMatchResult(i, match.score1, parseInt(e.target.value))}
                     />
                   </div>
                 </td>
                 <td className="p-2">{match.team2}</td>
                 <td className="p-2">{match.played ? "完了" : "未実施"}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </TabsContent>

       <TabsContent value="standings" className="mt-4">
         <table className="w-full border-collapse">
           <thead className="bg-gray-100">
             <tr>
               <th className="border p-2 text-left">順位</th>
               <th className="border p-2 text-left">チーム</th>
               <th className="border p-2 text-left">勝点</th>
               <th className="border p-2 text-left">勝</th>
               <th className="border p-2 text-left">負</th>
               <th className="border p-2 text-left">分</th>
             </tr>
           </thead>
           <tbody>
             {teams.map((team, i) => (
               <tr key={i} className="border-b">
                 <td className="p-2">{i + 1}</td>
                 <td className="p-2">{team.name}</td>
                 <td className="p-2">{team.points}</td>
                 <td className="p-2">{team.wins}</td>
                 <td className="p-2">{team.losses}</td>
                 <td className="p-2">{team.draws}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </TabsContent>
     </Tabs>
   </div>
 );
};

export default LeagueApp;
