import { useEffect } from 'react';

type Props = {
	selected: string;
	onSelect: (avatar: string) => void;
};

const avatars = Object.entries(
	import.meta.glob('../assets/*.{png,jpg,jpeg,svg,webp}', { eager: true, as: 'url' }),
)
	.map(([path, url]) => ({ path, url: url as string }))
	.sort((a, b) => a.path.localeCompare(b.path));


export const AvatarSelector = ({ selected, onSelect }: Props) => {
	useEffect(() => {
		if (!selected && avatars[0]) {
			onSelect(avatars[0].url);
		}
	}, [selected, onSelect]);

	return (
		<div className="avatar-selector">
			<p className="section-kicker">Selecciona un avatar</p>
			<div className="avatar-selector-grid" role="listbox" aria-label="Avatares disponibles">
				{avatars.map((avatar) => (
					<button
						key={avatar.path}
						type="button"
						className={`avatar-option${selected === avatar.url ? ' is-active' : ''}`}
						onClick={() => onSelect(avatar.url)}
						aria-pressed={selected === avatar.url}
					>
						<img src={avatar.url} alt="Avatar" loading="lazy" />
					</button>
				))}
			</div>
		</div>
	);
};
