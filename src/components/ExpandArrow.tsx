
type Props = {
    direction: 'down' | 'right',
    size?: '4' | '6' | '8';
}

export default function ExpandArrow({direction, size = '6'}: Props) {
    const arrowSize = `w-${size} h-${size}`;

    const arrow = {
        down: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={arrowSize}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        ),
        right: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={arrowSize}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        )
    }
  return arrow[direction];
}