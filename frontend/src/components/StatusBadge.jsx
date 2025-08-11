export default function StatusBadge({ status}){
    // remember in javascript its === not == lol
    if (status === "loading"){
        return <span style ={{ color : 'orange'}}>⏳ Loading..</span>;
    }
    if (status === "online"){
        return <span style ={{ color : 'limegreen'}}>✅ Online</span>;
    }
    if (status === "offline"){
        return <span style ={{ color : 'tomato'}}>❌ Offline</span>;
    }
    return <span>Uhh I dunno?</span>
}