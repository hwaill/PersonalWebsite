import style from "./icons.module.css"

export default function Icon({
	icon
}: {
	icon: string
}) {
	var iconParts = [{ color: "", url: "" }];
	switch (icon) {
		case "mailbox":
			iconParts = [{ color: "green", url: "/img/flaticon/fi-rr-mail1.svg" }];
			break;
		case "contactNavy":
			iconParts = [{ color: "navy", url: "/img/flaticon/fi-rr-envelope.svg" }];
			break;
		case "mail2":
			iconParts = [
				{ color: "coral", url: "/img/flaticon/fi-rr-envelope-dot1.svg" },
				{ color: "blue", url: "/img/flaticon/fi-rr-envelope-dot2.svg" },
				{ color: "blue", url: "/img/flaticon/fi-rr-envelope-dot3.svg" },
			];
			break;
		case "instagram":
			iconParts = [
				{ color: "blue", url: "/img/flaticon/fi-brands-insta1.svg" },
				{ color: "green", url: "/img/flaticon/fi-brands-insta2.svg" },
				{ color: "coral", url: "/img/flaticon/fi-brands-insta3.svg" },
			];
			break;
		case "linkedIn":
			iconParts = [
				{ color: "coral", url: "/img/flaticon/fi-brands-linkedin.svg" },
			];
			break;
		case "linkedInNavy":
			iconParts = [
				{ color: "navy", url: "/img/flaticon/fi-brands-linkedin.svg" },
			];
			break;
		case "gradCap":
			iconParts = [{ color: "coral", url: "/img/flaticon/fi-rr-gradCap.svg" }];
			break;
		case "writing":
			iconParts = [
				{ color: "blue", url: "/img/flaticon/fi-rr-writing1.svg" },
				{ color: "green", url: "/img/flaticon/fi-rr-writing2.svg" },
			];
			break;
		case "writing2":
			iconParts = [
				{ color: "green", url: "/img/flaticon/fi-rr-edit1.svg" },
				{ color: "blue", url: "/img/flaticon/fi-rr-edit2.svg" },
				{ color: "green", url: "/img/flaticon/fi-rr-edit3.svg" },
			];
			break;
		case "briefcase":
			iconParts = [
				{ color: "green", url: "/img/flaticon/fi-rr-briefcase.svg" },
			];
			break;
		case "user":
			iconParts = [{ color: "blue", url: "/img/flaticon/fi-rr-user.svg" }];
			break;
		case "location":
			iconParts = [{ color: "navy", url: "/img/flaticon/location.svg"}];
			break;
		default:
	}

	return (
		<>
			{iconParts.map((object, i) => (
				<div
					key={i}
					className={style.icon + " " + object.color}
					style={{
						WebkitMaskImage: "url(" + object.url + ")",
						maskImage: "url(" + object.url + ")",
					}}
				></div>
			))}
		</>
	);
}
