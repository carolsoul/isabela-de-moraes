export const contact = {
  email: 'isabelafmoraes21@gmail.com',
  phone: '(11) 98391-6271',
  whatsapp:
    'https://wa.me/5511983916271?text=Ol%C3%A1%2C%20Isabela!%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar.',
  linkedin: 'https://www.linkedin.com/in/isabelademoraes',
  cv: '/ISABELADEMORAES.pdf',
  location: 'Guarulhos, SP',
};

// Seções do site, na ordem da home (usado no menu e no footer). "sobre" leva à
// página completa; as demais são âncoras da home.
export const sections = [
  { label: 'sobre', id: 'sobre', path: '/sobre' },
  { label: 'trabalhos', id: 'trabalhos' },
  { label: 'vídeos', id: 'videos' },
  { label: 'serviços', id: 'servicos' },
  { label: 'contato', id: 'contato' },
];

export const sectionLink = (section) => section.path ?? { pathname: '/', hash: `#${section.id}` };
