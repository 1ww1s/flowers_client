import classes from './selectingItem.module.scss'

interface IItem {
    icon: string;
    name: string;
    value?: string;
}

interface IProps {
    items: IItem[];
    setSelectedName: (item: string) => void;
    selectedName: string;
}

export function SelectingItem({items, setSelectedName, selectedName}: IProps) {

    const onClick = (item: IItem) => {
        setSelectedName(item.name)
    }

    return (
        <ul className={classes.selectingItems}>
            {items.map((item, ind) => 
                <li 
                    className={classes.item + ' ' + (selectedName === item.name ? classes.selected : '')} 
                    key={ind} 
                    onClick={() => onClick(item)}
                >
                    <section className={classes.nameBox}>
                        <img src={item.icon} />
                        <span className={classes.name}>{item.name}</span>
                    </section>
                    <section className={classes.value}>
                        {item.value}
                    </section>
                </li>
            )}
        </ul>
    )
}