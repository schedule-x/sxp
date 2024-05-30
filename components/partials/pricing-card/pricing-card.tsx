import AppCheckmark from "./checkmark";
import AppDropdown from "../app-dropdown/app-dropdown";

type props = {
  data: {
    title: string;
    description: string;
    price: string;
    features: string[];
    buttonText: string;
  };
  buttonClass?: string;
  hasTeamSizeDropdown?: boolean;
  nOfDevsText?: string;
  onSelectNDevs?: (item: string) => void;
}

export default function PricingCard({ data, buttonClass, hasTeamSizeDropdown, nOfDevsText, onSelectNDevs }: props) {
  const teamSizeOptions = [
    { label: '1-3 developers', value: '1-3' },
    { label: '4-6 developers', value: '4-6' },
    { label: '7-10 developers', value: '7-10' },
    { label: '11-15 developers', value: '11-15' },
    { label: '16-20 developers', value: '16-20' },
  ]

  return (
    <div className="pricing-card">
      <h3 className="heading-font">
        {data.title}
      </h3>

      <p className="pricing-card-description">{data.description}</p>

      {hasTeamSizeDropdown && (
        <AppDropdown onSelect={onSelectNDevs} items={teamSizeOptions} selectedItem={teamSizeOptions[0]} />
      )}

      {nOfDevsText && (
        <p className="pricing-card-developers">{nOfDevsText}</p>
      )}

      <h4 className="pricing-card-price">
        {data.price}

        {data.price.includes('$') && (
          <span className="pricing-card-price-period">/ year</span>
        )}
      </h4>

      <ul className="pricing-card-features">
        {data.features.map((feature, index) => (
          <li key={index}>
            <AppCheckmark />
            {feature}
          </li>
        ))}
      </ul>

      <button className={buttonClass + ' btn'}>{data.buttonText}</button>
    </div>
  );
}
