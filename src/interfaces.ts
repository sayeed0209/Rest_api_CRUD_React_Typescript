export interface IPost {
	id: number;
	title: string;
	content: string;
	lat: string;
	long: string;
	image_url: string;
	created_at?: string;
	updated_at?: string;
}
export interface Props {
	children?: React.ReactNode;
	post?:IPost
  }
  export interface ButtonProps {
	children?: React.ReactNode;
	onClick?: () => void;
	className:string;
	disabled?:boolean;
  }
 
export type TodoContextType ={
	posts: IPost[];
	isLoading: boolean;
	error?:any;
	addPost:(e: React.FormEvent<EventTarget>)=>void;
	handleChange:(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>void;
	handelDelete:(id:number)=>void;
	handelUpdate:(e: React.FormEvent<EventTarget>,id:number)=>void;
	showSinglePost :(id: number) =>void;
	formData:any;
	setFormData:any;
	singlePost:any;
  }
	
