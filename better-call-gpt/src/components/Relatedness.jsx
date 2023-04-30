import FolderIcon from '@mui/icons-material/Folder'
export function Relatedness(props)
{
    return (
        <div className='w-3/4 h-80 bg-purple-100 grid grid-cols-4 gap-4'>
            
            {/* the list of files will come from the props
            do like a .map so that each file gets its own Card */}
            <RelateCard caseNumber='123456'/>
            <RelateCard caseNumber='654321'/>
            <RelateCard caseNumber='654321'/>
            <RelateCard caseNumber='654321'/>
            <RelateCard caseNumber='654321'/>
            <RelateCard caseNumber='654321'/>
        </div>
    );
}

function RelateCard(props)
{
    return (
        <div className='w-11/12 bg-white'>
            <span>Case number: {props.caseNumber}</span>
        </div>
        // <FolderIcon className='w-11/12 h-1/2 text-white'>
        //     <span>Case number: {props.caseNumber}</span>
        // </FolderIcon>
    )
}