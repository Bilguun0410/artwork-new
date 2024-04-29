interface menuProps {
    label: string;
    path: string;
    order: number
}
const menu : menuProps[] = [
    {
        label: 'Нүүр хуудас',
        path: '/',
        order: 0
    },
    {
        label: 'Бүтээлийн мэдээлэл',
        path: '/artworks',
        order: 1
    },
    {
        label: 'Зохиогчийн мэдээлэл',
        path: '/creators',
        order: 2
    },
    {
        label: 'Тайлан',
        path: '/reports',
        order: 3
    },
]

const data = {
    menu
}

export default data;