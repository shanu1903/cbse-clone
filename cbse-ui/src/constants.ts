


export const securityCode = [
    'IBUXCU',
    '0K0MR9',
    'S6GF1Q',
    '37PL33',
    'B73B3P',
    'S3FM3V',
    'DKUN56',
    '45DFTG',
    'GTR5DV',
    'E45FGH'
]

export const getSecurityCode = ()=>{
    const index = Math.floor(Math.random() * 10);
    return securityCode[index] || securityCode[0];
}